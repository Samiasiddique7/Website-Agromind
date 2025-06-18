import joblib
import pandas as pd
from sklearn.svm import SVR
from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS
import logging
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Path to the Excel file
excel_path = 'data_predictions.xlsx'

# Function to save data to Excel
def save_to_excel(inputs, prediction):
    # Prepare data dictionary
    data = inputs.copy()
    data['PREDICTION'] = prediction
    data['Timestamp'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Check if the file exists and load or create DataFrame
    if os.path.exists(excel_path):
        df_existing = pd.read_excel(excel_path)
        df_new = pd.DataFrame([data])
        df_final = pd.concat([df_existing, df_new], ignore_index=True)
    else:
        df_final = pd.DataFrame([data])
    
    # Save the DataFrame to Excel
    df_final.to_excel(excel_path, index=False)

@app.route("/api/predict", methods=["GET", "POST"])
def predict():
    try:
        # Load the model from the file
        loaded_model = joblib.load('svrr_model.pkl')

        if request.method == "GET":
            logging.debug("Received GET request")
            return jsonify({"message": "GET request received"})

        elif request.method == "POST":
            data = request.json
            logging.debug("Received POST request with data: %s", data)

            required_fields = ['ENGINE_SIZE', 'CYLINDERS', 'FUELCONSUMPTION_CITY', 'FUELCONSUMPTION_HWY', 'FUELCONSUMPTION_COMB']
            if not all(field in data for field in required_fields):
                return jsonify({"error": "Missing required fields"}), 400

            data_to_predict_df = pd.DataFrame({k: [v] for k, v in data.items()})
            
            # Predict the target value using the loaded model
            prediction = loaded_model.predict(data_to_predict_df)
            arr_double = prediction.astype(np.float64)

            # Save the inputs and prediction to Excel before sending the response
            save_to_excel(data, arr_double[0])

            return jsonify({"response": arr_double[0]}), 200
    except Exception as e:
        logging.error("An error occurred: %s", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
