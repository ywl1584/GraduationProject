from django.db import models
from tinymce.models import HTMLField
from mdeditor.fields import MDTextField
class DirMessages(models.Model):
    id=models.CharField(max_length=100,primary_key=True)
    dirname=models.CharField(max_length=100)
    dirpath=models.CharField(max_length=100)
    def __str__(self):
        return self.dirpath

