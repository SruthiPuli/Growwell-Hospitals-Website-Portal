from django.urls import re_path
from .views import ReactAppView

urlpatterns = [
    # Your API endpoints here

    # Catch all other routes and serve React app
    re_path(r'^.*$', ReactAppView.as_view(), name='frontend'),
]
