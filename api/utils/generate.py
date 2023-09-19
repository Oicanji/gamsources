import random


class generate():
    
    @staticmethod
    def hex():
        """ 
        Generate a random hex color
        """
        r = lambda: random.randint(0,255)
        return('#%02X%02X%02X' % (r(),r(),r()))