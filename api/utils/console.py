from pprint import pprint

from datetime import datetime


class console():
    @staticmethod
    def log(text):
        pprint("["+datetime.now().strftime("%d/%m/%Y %H:%M:%S")+"] LOG | "+text)
        
    @staticmethod
    def warn(text):
        pprint("\033[93m["+datetime.now().strftime("%d/%m/%Y %H:%M:%S")+"] WARN | "+text+"\033[0m")

    @staticmethod
    def info(text):
        pprint("\033[92m["+datetime.now().strftime("%d/%m/%Y %H:%M:%S")+"] INFO | "+text+"\033[0m")

    @staticmethod
    def error(text):
        pprint("\033[91m["+datetime.now().strftime("%d/%m/%Y %H:%M:%S")+"] ERROR | "+text+"\033[0m")