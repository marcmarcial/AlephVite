# 🏥 Pasaporte de Salud Digital

Plataforma descentralizada para la gestión segura de historiales clínicos, control de acceso granular por parte del paciente y validación de prescripciones impulsada por Inteligencia Artificial, construida sobre una **Subnet de Avalanche**.

## 🚀 Características Principales

* **Control de Acceso Soberano:** Los pacientes tienen el control absoluto sobre su información médica. Pueden otorgar permisos temporales (desde 1 hora hasta 10 años) y revocar el acceso en cualquier momento.
* **Protocolo de Urgencia (Break-Glass):** Permite a los profesionales de la salud acceder al historial en situaciones de emergencia donde el paciente está incapacitado. Este acceso genera una marca inalterable en la blockchain que el paciente puede auditar y, si es necesario, denunciar posteriormente.
* **Validación Médica por IA (Agente ERC-8004):** Cada nueva prescripción es analizada en tiempo real por un agente de Inteligencia Artificial que verifica el historial del paciente para detectar interacciones medicamentosas peligrosas o contraindicaciones, emitiendo alertas de seguridad inmediatas.
* **Trazabilidad Inmutable:** Todas las solicitudes de acceso, autorizaciones, revocaciones y prescripciones se registran como transacciones criptográficas en la Subnet de Avalanche, garantizando total transparencia y seguridad contra manipulaciones.

## 🏗️ Arquitectura del Sistema

El sistema se compone de un frontend optimizado para dispositivos móviles (Mobile-First) desarrollado en React, que interactúa directamente con los contratos inteligentes desplegados en la Subnet de Avalanche y se comunica con el oráculo del Agente de IA para la validación de recetas.

## ⚙️ Requisitos Previos

* Node.js (v18.0.0 o superior)
* npm o yarn
* Acceso a un nodo RPC de la Subnet de Avalanche (Local o Testnet/Mainnet)

## 🛠️ Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-organizacion/pasaporte-salud-digital.git
   cd pasaporte-salud-digital
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno:**
   Crea un archivo `.env` en la raíz del proyecto basándote en el archivo `.env.example`. Debes configurar los siguientes parámetros:

   ```env
   # Configuración de la Red Avalanche
   VITE_AVALANCHE_SUBNET_RPC=https://tu-nodo-rpc.avalanche.network/ext/bc/subnet/rpc
   VITE_CHAIN_ID=12345
   VITE_HEALTH_PASSPORT_CONTRACT=0xTuDireccionDeContrato

   # Configuración del Agente de IA (ERC-8004)
   VITE_AI_AGENT_ENDPOINT=https://api.tu-agente-ia.com/v1/validate
   VITE_AI_AGENT_API_KEY=tu_clave_de_api_aqui
   ```

4. **Ejecutar el entorno de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`.

## 🔒 Seguridad y Privacidad

El "Pasaporte de Salud Digital" cumple con los más altos estándares de privacidad de datos médicos (inspirado en normativas como HIPAA y GDPR). Los datos clínicos sensibles están encriptados off-chain, mientras que la blockchain de Avalanche gestiona exclusivamente los punteros de acceso (Access Control Lists) y los hashes de integridad, asegurando que la información médica nunca sea pública en la red.

## 📜 Licencia

Este proyecto está bajo la Licencia Apache 2.0. Consulta el archivo `LICENSE` para más detalles.
