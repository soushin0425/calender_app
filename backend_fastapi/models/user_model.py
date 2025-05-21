import sys
sys.path.append('../')
import models.common as common
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from datetime import datetime

class User(common.Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(50), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    is_administrator = Column(Boolean, default=False, nullable=False)

#全てのユーザを取得する関数
def get_users()-> list[dict] | None:
    session = common.create_connect_session()
    if session is None:
        print("Failed to connect to the database.")
        return None
    try:
        users = session.query(User).all()
        if not users:
            return None
        
        # User オブジェクトを辞書に変換
        user_list = []
        for user in users:
            user_dict = {
                "id": user.id,
                "email": user.email,
                "password": user.password,
                "is_administrator": user.is_administrator,
            }
            user_list.append(user_dict)
        return user_list

    except Exception as e:
        return None
    finally:
        session.close()

#ユーザIDから単一のユーザを取得する関数
def get_user_by_id(user_id)-> dict | None:
    session = common.create_connect_session()
    if session is None:
        print("Failed to connect to the database.")
        return None
    try:
        user = session.query(User).filter(User.id == user_id).first()
        
        if user:
            user_dict = {
                "id": user.id,
                "email": user.email,
                "password": user.password,
                "is_administrator": user.is_administrator,
            }
            return user_dict
        else:
            return None
        
    except Exception as e:
        return None
    finally:
        session.close()

#ユーザのメールアドレスから単一のユーザを取得する関数
def get_user_by_email(email):
    session = common.create_connect_session()
    if session is None:
        print("Failed to connect to the database.")
        return None
    
    try:
        user = session.query(User).filter(User.email == email).first()
        
        if user:
            user_dict = {
                "id": user.id,
                "email": user.email,
                "password": user.password,
                "is_administrator": user.is_administrator,
            }
            return user_dict
        else:
            return None
        
    except Exception as e:
        return None
    finally:
        session.close()

#ユーザを作成する関数
def create_user(email, password, is_administrator):
    session = common.create_connect_session()
    if session is None:
        print("Failed to connect to the database.")
        return None
    
    try:
        new_user = User(email=email, password=password, is_administrator=is_administrator)
        session.add(new_user)
        session.commit()
        return new_user
    except Exception as e:
        return None
    finally:
        session.close()

#ユーザを削除する関数
def delete_user(user_id):
    session = common.create_connect_session()
    if session is None:
        print("Failed to connect to the database.")
        return None
    
    try:
        user = session.query(User).filter(User.id == user_id).first()
        if user:
            session.delete(user)
            session.commit()
            return None
        else:
            return {"error": "User not found."}
    except Exception as e:
        return None
    finally:
        session.close()

def authenticate_user(email: str, password: str):
    session = common.create_connect_session()
    if session is None:
        return None
    try:
        user = session.query(User).filter(User.email == email).first()
        if user and user.password == password:
            return user
        return None
    finally:
        session.close()
