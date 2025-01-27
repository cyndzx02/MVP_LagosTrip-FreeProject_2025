sudo apt update
sudo apt upgrade
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v  # Check Node.js version
npm -v   # Check npm version
sudo npm install -g @vue/cli
vue --version
vue create agronova_frontend
cd  agronova_frontend
npm run serve
