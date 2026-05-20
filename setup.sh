#!/usr/bin/env bash
# ============================================
# MVP LagosTrip - Script d'installation
# Monorepo: Express.js (backend) + Vue 3 (frontend) + MySQL
# ============================================
set -e

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'

echo -e "${CYAN}============================================${NC}"
echo -e "${CYAN}  MVP LagosTrip - Installation${NC}"
echo -e "${CYAN}============================================${NC}"
echo ""

# ── 1. Node.js ───────────────────────────────────────────────────────────────
echo -e "${YELLOW}[1/5] Vérification de Node.js...${NC}"
if ! command -v node &>/dev/null; then
    echo -e "${RED}Node.js n'est pas installé. Installez Node.js 18+ depuis https://nodejs.org/${NC}"
    exit 1
fi
NODE_VERSION=$(node --version)
echo -e "${GREEN}  Node.js $NODE_VERSION${NC}"

# ── 2. MySQL ─────────────────────────────────────────────────────────────────
echo -e "${YELLOW}[2/5] Vérification de MySQL...${NC}"
if command -v mysql &>/dev/null; then
    MYSQL_VERSION=$(mysql --version 2>&1)
    echo -e "${GREEN}  $MYSQL_VERSION${NC}"
else
    echo -e "${YELLOW}  MySQL non trouvé.${NC}"
    echo "  Installez MySQL depuis https://dev.mysql.com/downloads/"
    echo "  Ou utilisez Docker: docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql:8"
fi

# ── 3. Backend (Express.js) ─────────────────────────────────────────────────
echo -e "${YELLOW}[3/5] Installation du backend (agronova_backend)...${NC}"
if [ -d "agronova_backend" ]; then
    cd agronova_backend
    npm install
    echo -e "${GREEN}  Backend installé (Express, JWT, bcrypt, mysql2)${NC}"
    cd ..
else
    echo -e "${YELLOW}  Dossier agronova_backend non trouvé${NC}"
fi

# ── 4. Frontend (Vue 3) ─────────────────────────────────────────────────────
echo -e "${YELLOW}[4/5] Installation du frontend (FRONT)...${NC}"
if [ -d "FRONT" ]; then
    cd FRONT
    npm install
    echo -e "${GREEN}  Frontend installé (Vue 3, Vue Router, Tailwind, Axios)${NC}"
    cd ..
else
    echo -e "${YELLOW}  Dossier FRONT non trouvé${NC}"
fi

# ── 5. Base de données ──────────────────────────────────────────────────────
echo -e "${YELLOW}[5/5] Configuration de la base de données...${NC}"
if [ -f "agronova_backend/agronova.sql" ]; then
    echo -e "${YELLOW}  Fichier SQL trouvé: agronova_backend/agronova.sql${NC}"
    echo -e "  Pour importer la base:"
    echo -e "    ${CYAN}mysql -u root -p < agronova_backend/agronova.sql${NC}"
else
    echo -e "${YELLOW}  Pas de fichier SQL trouvé${NC}"
fi

# Environnement backend
if [ -d "agronova_backend" ] && [ ! -f "agronova_backend/.env" ]; then
    cat > agronova_backend/.env << 'ENVEOF'
# Base de données MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=agronova

# JWT
JWT_SECRET=your_jwt_secret

# Server
PORT=3000
ENVEOF
    echo -e "${GREEN}  agronova_backend/.env créé${NC}"
    echo -e "${YELLOW}  IMPORTANT: Renseignez vos credentials MySQL dans agronova_backend/.env${NC}"
fi

echo ""
echo -e "${GREEN}Installation terminée !${NC}"
echo ""
echo -e "Lancer le backend:   ${CYAN}cd agronova_backend && npm start${NC}"
echo -e "Lancer le frontend:  ${CYAN}cd FRONT && npm run serve${NC}"
echo -e "Importer la DB:      ${CYAN}mysql -u root -p < agronova_backend/agronova.sql${NC}"
