from django.urls import path
from api import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('create-patient/',views.PatientCreate.as_view()),
    path('login-user/',views.LoginPatient.as_view()),
    path('add-department/',views.AddDepartment.as_view()),
    path('add-doctor/',views.AddDoctor.as_view()),
    path('update-doctor/<int:id>/',views.UpdateDoctor.as_view()),
    path('book-appointment/',views.BookAppointment.as_view()),
    path('doctor-login/',views.DoctorLoginView.as_view()),
    path('get-appointments/<str:doctor_username>/', views.GetAppointments.as_view(), name='get-appointments'),
    path('delete-doctor/<int:id>/',views.DeleteDoctor.as_view()),
    path('update-appointment/<int:id>/',views.GetAppointments.as_view()),
    path('delete-appointments/<int:id>/',views.GetAppointments.as_view()),
    path('login-admin/',views.AdminView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    

]


