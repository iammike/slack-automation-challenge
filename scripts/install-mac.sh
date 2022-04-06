#!/bin/bash

echo "Installing Homebrew (will prompt for password)..."
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

echo "Installing Node.js..."
brew install node

echo "Installing Node Modules..."
npm install

echo "Installing Docker..."
brew install --cask docker

echo "Opening Docker (may require user interaction)..."
open /Applications/Docker.app