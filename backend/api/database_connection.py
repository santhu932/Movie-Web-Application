from urllib.parse import quote_plus
from pymongo import MongoClient

# Database connection parameters
username = "adt_group19"
password = "adt_group19"
cluster_address = "cluster0.cumon8s.mongodb.net/?retryWrites=true&w=majority"
database_name = "MovieIndustryAnalysis"

escaped_username = quote_plus(username)
escaped_password = quote_plus(password)

connection_string = f"mongodb+srv://{escaped_username}:{escaped_password}@{cluster_address}/{database_name}"

try:
    client = MongoClient(connection_string)

    if client.server_info():
        print("Connection to the database established successfully.")
    else:
        print("Failed to establish a connection to the database.")

except Exception as e:
    print(f"Error: {e}")
