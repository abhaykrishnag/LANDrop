from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.upload import router as upload_router
from app.routes.download import router as download_router
from app.routes.qr import router as qr_router

from fastapi.responses import FileResponse

app = FastAPI(title="LANDrop")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(download_router)
app.include_router(qr_router)


@app.get("/")
def root():
    return {"message": "LANDrop Backend Running"}   

@app.get("/download/{filename}")
async def download_file(filename: str):
    file_path = UPLOAD_DIR / filename

    return FileResponse(
        path=file_path,
        filename=filename,
        media_type="application/octet-stream"
    )