from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import string
from nltk.corpus import stopwords
import nltk
from nltk.stem.porter import PorterStemmer

nltk.download('punkt')
nltk.download('stopwords')

app = FastAPI()

# Configure CORS
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load pre-trained model and vectorizer
tfidf = pickle.load(open("vectorizer.pkl", "rb"))
model = pickle.load(open("spam.pkl", "rb"))

# Stemmer instance
ps = PorterStemmer()

# Function to preprocess and transform input text
def transform_text(text):
    text = text.lower()
    text = nltk.word_tokenize(text)

    # Remove non-alphanumeric characters
    y = [i for i in text if i.isalnum()]

    # Remove stopwords and punctuation
    y = [i for i in y if i not in stopwords.words("english") and i not in string.punctuation]

    # Stem the words
    y = [ps.stem(i) for i in y]

    return " ".join(y)

# Define request body structure
class Message(BaseModel):
    text: str

# Redirect root URL to /docs
@app.get("/")
def read_root():
    return {"message": "Welcome to the Email/SMS Spam Classifier API. Go to /docs for Swagger UI."}

# Spam classification endpoint
@app.post("/predict/")
def predict_spam(message: Message):
    # 1. Preprocess the text
    transformed_text = transform_text(message.text)

    # 2. Vectorize the transformed text
    vector_input = tfidf.transform([transformed_text])

    # 3. Predict using the model
    result = model.predict(vector_input)[0]

    # 4. Return the prediction result
    if result == 1:
        return {"prediction": "Spam"}
    else:
        return {"prediction": "Not Spam"}
