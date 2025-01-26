#!/bin/bash -i

echo "Installing Starship prompt..."
curl -sS https://starship.rs/install.sh | sh -s -- -y

echo "Configuring Starship for zsh..."
echo 'eval "$(starship init zsh)"' >> ~/.zshrc

echo "Starship installation completed successfully!"

echo "Installing Node.js v20.11.1 using nvm..."
. $NVM_DIR/nvm.sh && nvm install 20.11.1
