from fastapi import APIRouter
from fastapi.responses import FileResponse
import os

router = APIRouter()

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.get("/files")
def get_files():

    files = []

    for file in os.listdir(UPLOAD_FOLDER):

        path = os.path.join(
            UPLOAD_FOLDER,
            file
        )

        files.append({
            "name": file,
            "size": os.path.getsize(path)
        })

    return files


@router.get("/download/{filename}")
def download_file(filename: str):

    path = os.path.join(
        UPLOAD_FOLDER,
        filename
    )

    return FileResponse(
        path,
        filename=filename
    )