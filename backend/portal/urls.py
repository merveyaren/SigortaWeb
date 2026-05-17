from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AlertViewSet,
    ClaimViewSet,
    PaymentViewSet,
    PolicyViewSet,
    QuoteViewSet,
)

router = DefaultRouter()
router.register(r"policies", PolicyViewSet, basename="policy")
router.register(r"quotes", QuoteViewSet, basename="quote")
router.register(r"claims", ClaimViewSet, basename="claim")
router.register(r"payments", PaymentViewSet, basename="payment")
router.register(r"alerts", AlertViewSet, basename="alert")

urlpatterns = [
    path("", include(router.urls)),
]
