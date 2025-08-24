# Dockerfile para FastAPI
FROM python:3.11-slim

# Establece directorio de trabajo
WORKDIR /app

# Copia los requerimientos y luego instala dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo el contenido del directorio API
COPY . .

# Exponer puerto 8000
EXPOSE 8000

# Comando para levantar la API con Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
