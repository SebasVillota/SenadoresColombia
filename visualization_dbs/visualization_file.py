import pandas as pd
from sqlalchemy import create_engine, inspect
import os
from tabulate import tabulate

# Ruta a la base de datos
# ----------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "..", "db", "senadores.db")


# Crear motor de conexión SQLite
# ----------------------------------
engine = create_engine(f"sqlite:///{DB_PATH}")

# 3. Verificar tablas
# ----------------------------------
inspector = inspect(engine)
tables = inspector.get_table_names()

print("Tablas en la base de datos:", tables)

# 4. Mostrar primeros registros
# ----------------------------------
query = """
        SELECT periodo, nombre, partido, numero_votos
        FROM senadores
        WHERE numero_votos != 'ND'
        ORDER BY CAST(numero_votos AS INTEGER) DESC
        LIMIT 10;
        """
        
df = pd.read_sql(query, engine)

print("Primeros 10 registros de la tabla 'senadores':")
print(tabulate(df, headers="keys", tablefmt="psql"))
