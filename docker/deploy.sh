#/bin/bash
echo "Start deploy app with ISR"
echo "Please ensure you've GIT PULL your project BEFORE"

docker-compose up --build -d
docker network connect lucis_network playcore_fe_isr
echo "Deploy successfully"
