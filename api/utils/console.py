from pprint import pprint

from datetime import datetime


class console():
    
    def date(self):
        return datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    
    def construct(self, type, msg):
        pprint("["+self.date()+"] "+type+" | "+str(msg))

    
    @staticmethod
    def log(msg):
        new_log = console()
        new_log.construct("LOG", msg)
        
    @staticmethod
    def warn(msg):
        new_log = console()
        new_log.construct("WARN", msg)
        
    @staticmethod
    def info(msg):
        new_log = console()
        new_log.construct("INFO", msg)

    @staticmethod
    def error(msg):
        new_log = console()
        new_log.construct("ERROR", msg)