import sys
sys.path.append('../')

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models.user_model import authenticate_user

auth_endpoint = APIRouter()

class PostAuthAdminRequest(BaseModel):
    email: str
    password: str
    administorator_code: int

class PostAuthStudentRequest(BaseModel):
    email: str
    password: str

@auth_endpoint.post("/auth/admin/login", tags=["auth"])
def handle_login(user: PostAuthAdminRequest):
    """
    ログインに使用するエンドポイント
    """
    return {"user": f"メールアドレス {user.email} パスワード {user.password} ユーザを作成するエンドポイント"}

@auth_endpoint.post("/auth/student/login", tags=["auth"])
def handle_student_login(user: PostAuthStudentRequest):
    found_user = authenticate_user(user.email, user.password)
    if not found_user:
        raise HTTPException(status_code=401, detail="メールアドレスまたはパスワードが間違っています")
    return {
        "id": found_user.id,
        "email": found_user.email,
        "is_administrator": found_user.is_administrator
    }