from django.urls import re_path
from .views import FrontendAppView

urlpatterns = [
    # Your API endpoints here

    # Catch all other routes and serve React app
    re_path(r'^.*$', FrontendAppView.as_view(), name='frontend'),
]
