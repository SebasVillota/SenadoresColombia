# Proyecto: API de Senadores de Colombia

Este proyecto consiste en **extraer datos públicos de senadores de Colombia**, exponerlos mediante una **API REST** y visualizarlos en un **frontend** sencillo hecho en React.

---

## Objetivo

- Validar la capacidad de **extraer datos públicos**, **procesarlos**, **exponerlos mediante una API** y **construir un frontend interactivo**, todo en un entorno local.

---

## Estructura del Proyecto

etl/ # Scripts de extracción y carga de datos
api/ # API desarrollada en FastAPI
frontend/ # Aplicación React para visualizar los datos
db/ # Base de datos SQLite (senadores.db)
imagenes_procedimiento/ # Imágenes para documentación y README

yaml
Copiar
Editar

---

## Clonar el proyecto

```bash
git clone https://github.com/SebasVillota/SenadoresColombia
cd nombre-del-repo
Configuración del entorno
1. Python
bash
Copiar
Editar
# Crear entorno virtual
python -m venv .venv

# Activar entorno virtual
# Windows
.venv\Scripts\activate
# Linux / macOS
source .venv/bin/activate

# Instalar dependencias de la API
pip install -r api/requirements.txt
2. Node.js (Frontend)
bash
Copiar
Editar
cd frontend
npm install
Ejecutar el proyecto
1. Ejecutar el ETL
bash
Copiar
Editar
python etl/etl_senadores.py
Esto creará o actualizará la base de datos db/senadores.db.

Visualización del proceso:


2. Ejecutar la API
bash
Copiar
Editar
cd api
uvicorn main:app --reload --host 127.0.0.1 --port 8000
La API estará disponible en: http://127.0.0.1:8000/

Arquitectura general de la API:


Funcionamiento interno:


3. Ejecutar el Frontend
bash
Copiar
Editar
cd frontend
npm run dev
Luego abrir en el navegador: http://localhost:5173

Visualización del Frontend:

Tabla interactiva y búsqueda:


Tabla con filtro por partido político:


Visualización de datos de la base de datos:


Endpoints de la API
GET /senadores → Listar todos los senadores

GET /senadores/{id} → Consultar senador por ID

GET /senadores/buscar/?keyword= → Buscar por palabra clave

GET /senadores/estadisticas/ → Obtener estadísticas agregadas

Se puede filtrar por partido político y limitar la cantidad de registros.

Buenas prácticas
Mantén tu entorno virtual aislado para evitar conflictos de dependencias.

No subas archivos pesados ni dependencias (.venv/, node_modules/) a GitHub.

Usa ramas para nuevas funcionalidades:

bash
Copiar
Editar
git checkout -b nombre-rama