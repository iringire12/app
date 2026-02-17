# Delval Health Check and Monitoring Script - Windows Version

$AlertEmail = "admin@delval.com"
$Services = @("frontend:8080", "backend:5000")

Write-Host "Starting Monitoring..." -ForegroundColor Cyan

foreach ($Service in $Services) {
    $parts = $Service -split ":"
    $Name = $parts[0]
    $Port = $parts[1]
    
    Write-Host "Checking $Name on port $Port..."
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:$Port" -Method Head -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "Service $Name is UP." -ForegroundColor Green
        }
    } catch {
        Write-Host "ALERT: Service $Name is DOWN! Sending notification to $AlertEmail" -ForegroundColor Red
        
        # Send alert to MailHog using its API
        $body = @{
            From = "system@delval.com"
            To = @($AlertEmail)
            Subject = "SYSTEM ALERT - $Name IS DOWN"
            Body = "The service $Name on port $Port is currently unreachable."
        } | ConvertTo-Json
        
        try {
            Invoke-RestMethod -Uri "http://localhost:8025/api/v1/messages" -Method Post -Body $body -ContentType "application/json"
        } catch {
            Write-Host "Failed to send email alert to MailHog. Is MailHog running?" -ForegroundColor Yellow
        }
        
        "$(Get-Date): Subject: SYSTEM ALERT - $Name IS DOWN" | Out-File -FilePath "monitoring.log" -Append
    }
}

# Check system load (Simulated for Windows)
$Load = (Get-WmiObject win32_processor | Measure-Object -Property LoadPercentage -Average).Average
Write-Host "Current CPU Load: $Load %"

# Simulate auto-scaling
if ($Load -gt 80) {
    Write-Host "High load detected. Scaling up backend instances..." -ForegroundColor Yellow
    docker compose up --scale backend=3 -d
} else {
    Write-Host "Load is normal." -ForegroundColor Green
}

Write-Host "Monitoring Cycle Completed."
