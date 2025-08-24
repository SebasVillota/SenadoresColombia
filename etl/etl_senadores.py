import requests
import pandas as pd
from sqlalchemy import create_engine
import os

# Carpeta actual del archivo etl_senadores.py
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Ruta absoluta a la base de datos
DB_PATH = os.path.join(BASE_DIR, "..", "db", "senadores.db")

# --------------------------
# Definición de la API y la tabla donde se extraerán los datos
# --------------------------
API_URL = "https://www.datos.gov.co/resource/sjwx-dr6n.json"
TABLE_NAME = "senadores"

# Función para cada paso del ETL (Extrae datos de la API pública de datos.gov)
def extract_data(limit=200):
    
    print("Extrayendo datos desde API")
    params = {"$limit": limit}
    resp = requests.get(API_URL, params=params)
    resp.raise_for_status()  # si hay error 400/500 lanza excepción
    return resp.json()

#Función para transformar los datos y normalizarlos en un DataFrame
def transform_data(raw):
    print("[Transformando datos")
    df = pd.DataFrame(raw)

    # Nos quedamos con columnas relevantes
    cols = [
        "periodo", "nombre", "g_nero", "a_o_de_nacimiento",
        "departamento_de_nacimiento", "ciudad_de_nacimiento",
        "partido", "n_mero_de_votos", "comisi_n_constitucional",
        "correo_electr_nico", "telefono", "comisi_n_legal", "pagina_web",
        "twitter", "facebook"
    ]
    # Asegurar que existan aunque falten algunos campos
    for c in cols:
        if c not in df.columns:
            df[c] = None

    df = df[cols]

    # Limpiar nombres de columnas (snake_case)
    df.columns = [
        "periodo", "nombre", "genero", "anio_nacimiento",
        "departamento_nacimiento", "ciudad_nacimiento",
        "partido", "numero_votos", "comision_constitucional",
        "correo","telefono","comision_legal", "pagina_web",
        "twitter", "facebook"
    ]

    return df

# Función para guardar los datos en SQLite
def load_data(df):
    print(f"Guardando datos en {DB_PATH} ")
    engine = create_engine(f"sqlite:///{DB_PATH}")
    df.to_sql(TABLE_NAME, engine, if_exists="replace", index=False)
    print("Datos guardados correctamente.")

# Función principal que ejecuta el ETL
def run_etl():
    raw = extract_data(limit=150)   # tenemos 106 senadores
    df = transform_data(raw)
    load_data(df)
    print(f"ETL completo: {len(df)} registros cargados.")

if __name__ == "__main__":
    run_etl()
