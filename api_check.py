# import requests
# import urllib.parse

# prompt = "An evil mole facing towards me, with bog teeth and a sinister grin, wearing a tiny top hat and monocle, digging through a garden at night, with glowing eyes and a mischievous expression, surrounded by moonlight and shadows."
# params = {
#     "width": 120,
#     "height": 120,
#     "seed": 42,
#     "model": "flux",
#     "nologo": "true", # Optional, set to "true" for registered referrers/tokens
#     "transparent": "true", # Optional - generates transparent background (gptimage model only)
#     # "image": "https://example.com/input-image.jpg", # Optional - for image-to-image generation (kontext & gptimage)
#     # "referrer": "MyPythonApp" # Optional for referrer-based authentication
# }
# encoded_prompt = urllib.parse.quote(prompt)
# url = f"https://image.pollinations.ai/prompt/{encoded_prompt}"

# try:
#     response = requests.get(url, params=params, timeout=300) # Increased timeout for image generation
#     response.raise_for_status() # Raise an exception for bad status codes

#     with open('generated_image2.jpg', 'wb') as f:
#         f.write(response.content)
#     print("Image saved as generated_image2.jpg")

# except requests.exceptions.RequestException as e:
#     print(f"Error fetching image: {e}")
#     # Consider checking response.text for error messages from the API
#     # if response is not None: print(response.text)
    
# import requests
# import urllib.parse

# text = "Generating audio using the GET method is simple for short texts."
# voice = "alloy" # alloy, echo, fable, onyx, nova, shimmer
# output_filename = "generated_audio_get.mp3"

# encoded_text = urllib.parse.quote(text)
# url = f"https://text.pollinations.ai/{encoded_text}"
# params = {
#     "model": "openai-audio",
#     "voice": voice
# }

# try:
#     response = requests.get(url, params=params)
#     response.raise_for_status()

#     # Check if the response content type indicates an audio file
#     if 'audio/mpeg' in response.headers.get('Content-Type', ''):
#         with open(output_filename, 'wb') as f:
#             f.write(response.content)
#         print(f"Audio saved successfully as {output_filename}")
        
#     else:
#         print("Error: Expected audio response, but received unexpected content type or data.")
#         print(f"Content-Type: {response.headers.get('Content-Type')}")
#         print("Response body preview (first 200 chars):", response.text[:200])

# except requests.exceptions.RequestException as e:
#     print(f"Error making TTS GET request: {e}")
#     # if response is not None: print(response.text) # Print API error for debugging

import requests
import time
import dotenv
# Load environment variables from .env file
dotenv.load_dotenv()
API_TOKEN = dotenv.get_key(".env", "API_Token")
# Replace with your actual API token
# API_TOKEN = "YOUR_API_TOKEN_HERE"
BASE_URL = "https://public-api.beatoven.ai"

def compose_track(prompt, format="wav", looping=False):
    url = f"{BASE_URL}/api/v1/tracks/compose"
    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json"
    }
    payload = {
        "prompt": {
            "text": prompt
        },
        "format": format,
        "looping": looping
    }
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    return response.json()["task_id"]

def check_task_status(task_id):
    url = f"{BASE_URL}/api/v1/tasks/{task_id}"
    headers = {
        "Authorization": f"Bearer {API_TOKEN}"
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()

if __name__ == "__main__":
    prompt = "30 seconds peaceful lo-fi chill hop track"
    print("Starting composition...")
    task_id = compose_track(prompt)
    print(f"Task started. Task ID: {task_id}")

    while True:
        status_resp = check_task_status(task_id)
        status = status_resp.get("status")
        print(f"Task status: {status}")

        if status == "composed":
            print("Track composed!")
            meta = status_resp.get("meta", {})
            print("Track URL:", meta.get("track_url"))
            print("Stems URLs:", meta.get("stems_url"))
            break
        elif status in ("composing", "running"):
            time.sleep(5)
        else:
            print("Unexpected status:", status)
            break