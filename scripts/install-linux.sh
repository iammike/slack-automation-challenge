#!/bin/bash

echo "Updating APT..."
sudo apt update

echo "Installing Node.js..."
sudo apt install nodejs npm

echo "Installing Node Modules..."
npm install

echo "Installing Docker..."
sudo apt install docker.io
sudo apt install docker-compose

echo "Starting Docker..."
sudo systemctl start docker