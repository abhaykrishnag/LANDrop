from fastapi import APIRouter
from fastapi.responses import FileResponse

import qrcode
import os

from app.services.network_service import get_local_ip

router = APIRouter()


@router.get("/qr")
def generate_qr():

    ip = get_local_ip()

    url = f"http://{ip}:8000"

    img = qrcode.make(url)

    qr_path = "qr.png"

    img.save(qr_path)

    return FileResponse(
        qr_path,
        media_type="image/png"
    )