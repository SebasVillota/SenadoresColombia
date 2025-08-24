from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import os
from typing import Optional 

app = FastAPI(title="API de Senadores", description="API para consultar información de senadores de Colombia")

# Configurar CORS para permitir conexiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ruta absoluta a la base de datos
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "..", "db", "senadores.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.get("/")
def read_root():
    return {
        "message": "API de Senadores funcionando correctamente",
        "endpoints": {
            "todos_los_senadores": "/senadores",
            "senador_por_id": "/senadores/{id}",
            "buscar_por_nombre": "/senadores/buscar/?keyword={palabra}",
            "filtrar_por_partido": "/senadores?partido={partido}"
        }
    }

@app.get("/senadores")
def listar_senadores(
    partido: Optional[str] = Query(default=None, description="Filtrar por partido político"),
    limit: Optional[int] = Query(default=None, description="Límite de registros")
):
    conn = get_db_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM senadores"
    params = []

    if partido:
        query += " WHERE partido LIKE ?"
        params.append(f"%{partido}%")

    if limit:
        query += " LIMIT ?"
        params.append(limit)

    cursor.execute(query, params)
    senadores = cursor.fetchall()
    conn.close()

    return {
        "total": len(senadores),
        "senadores": [dict(row) for row in senadores]
    }

@app.get("/senadores/{senador_id}")
def consultar_por_id(senador_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM senadores WHERE rowid = ?", (senador_id,))
    senador = cursor.fetchone()
    conn.close()

    if senador is None:
        raise HTTPException(status_code=404, detail="Senador no encontrado")

    return dict(senador)

@app.get("/senadores/buscar/")
def buscar_por_nombre(keyword: str = Query(..., description="Palabra clave en el nombre")):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT rowid as id, * FROM senadores WHERE nombre LIKE ? OR partido LIKE ? OR departamento_nacimiento LIKE ?", 
        (f"%{keyword}%", f"%{keyword}%", f"%{keyword}%")
    )
    senadores = cursor.fetchall()
    conn.close()

    return {
        "total": len(senadores),
        "keyword": keyword,
        "senadores": [dict(row) for row in senadores]
    }

@app.get("/senadores/estadisticas/")
def obtener_estadisticas():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Total de senadores
    cursor.execute("SELECT COUNT(*) as total FROM senadores")
    total = cursor.fetchone()["total"]
    
    # Senadores por partido
    cursor.execute("SELECT partido, COUNT(*) as cantidad FROM senadores GROUP BY partido ORDER BY cantidad DESC")
    por_partido = [dict(row) for row in cursor.fetchall()]
    
    # Senadores por género
    cursor.execute("SELECT genero, COUNT(*) as cantidad FROM senadores GROUP BY genero")
    por_genero = [dict(row) for row in cursor.fetchall()]
    
    # Senadores por departamento
    cursor.execute("SELECT departamento_nacimiento, COUNT(*) as cantidad FROM senadores WHERE departamento_nacimiento IS NOT NULL GROUP BY departamento_nacimiento ORDER BY cantidad DESC LIMIT 10")
    por_departamento = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return {
        "total_senadores": total,
        "por_partido": por_partido,
        "por_genero": por_genero,
        "por_departamento": por_departamento
    }