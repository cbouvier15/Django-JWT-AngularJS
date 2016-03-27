from django.conf.urls import url, include
from rest_framework import routers
from User.views import UserViewSet, UserProtectedViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'users-protected', UserProtectedViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
