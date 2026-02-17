#!/bin/bash

# Delval Health Check and Monitoring Script

ALERT_EMAIL="admin@delval.com"
SERVICES=("frontend:8080" "backend:5000")

echo "Starting Monitoring..."

for SERVICE in "${SERVICES[@]}"; do
    IFS=':' read -r NAME PORT <<< "$SERVICE"
    echo "Checking $NAME on port $PORT..."
    
    # Check if service is reachable
    if curl -s --head  --request GET http://localhost:$PORT | grep "200 OK" > /dev/null; then
        echo "Service $NAME is UP."
    else
        echo "ALERT: Service $NAME is DOWN! Sending notification to $ALERT_EMAIL"
        # In a real system, you would use 'mail' or an API like SendGrid/Mailgun
        echo "Subject: SYSTEM ALERT - $NAME IS DOWN" | tee -a monitoring.log
    fi
done

# Check system load for auto-scaling simulation
LOAD=$(uptime | awk -F'load average:' '{ print $2 }' | cut -d, -f1 | xargs)
echo "Current System Load: $LOAD"

# Simulate auto-scaling
if (( $(echo "$LOAD > 1.0" | bc -l) )); then
    echo "High load detected. Scaling up backend instances..."
    docker compose up --scale backend=3 -d
else
    echo "Load is normal."
fi

echo "Monitoring Cycle Completed."
