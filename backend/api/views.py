from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from api.serializers import RegisterPatientSerializer,DepartmentSerializer
from api.models import User,Department,Doctor,Appointment
from rest_framework_simplejwt.tokens import RefreshToken
import json
from django.shortcuts import get_object_or_404


# Create your views here.

class UpdateDoctor(APIView):
    def put(self, request, id):
        id = id
        username = request.data.get('username')
        email = request.data.get('email')
        staffid = request.data.get('staffId')
        departmentname = request.data.get('department')
        image = request.data.get('image')
        
        print("this is",request.data)
        try:
            doctor = Doctor.objects.get(pk=id)
            department = Department.objects.filter(name=departmentname).first()
            print("vertoy",doctor)
            doctor.user.username = username
            doctor.user.email = email
            doctor.user.department = departmentname
            doctor.department = department
            doctor.profile_img=image
            
            doctor.user.save()
            doctor.save()
            doctor_list = [{
                    "id":doctor.pk,
                    "username": doctor.user.username,
                    "department": doctor.department.name if doctor.department else "Unknown",
                    "profile": doctor.profile_img.url if doctor.profile_img else None,
                    "email": doctor.user.email,
                    "staffid": doctor.user.staff_id
                }]
            
            return Response({"msg":doctor_list})
        except Exception as e:
            print("nothing vayena vayena",str(e))
            return Response({"xixi":"xixi"})
        
        return Response({"msg":"go"})
class PatientCreate(APIView):
    def post(self,request):
        print(request.data)
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        print(username,email,password)
        
        user = User.objects.filter(email=email).first()
        if user is not None:
            print("The user already exists")
            return Response({
                "msg":"the user with this mail aready exists"
            },status=status.HTTP_400_BAD_REQUEST)
        else:
            print("okay make the user")
            try:
                u = User.objects.create_user(email=email,username=username,password=password)
                print("usre banyo")
            except:
                print("error")
            
        
        
        
        return Response({
            "msg":"went"
        })

class LoginPatient(APIView):
    def post(self,request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = authenticate(username=email,password=password)
        if user is not None and user.is_patient:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({'error': 'Invalid credentials'},status=status.HTTP_406_NOT_ACCEPTABLE)


class AddDepartment(APIView):
    def post(self,request):
        # print("this is",request.data)
        department = request.data.get('name')
        # print(department)
        d= Department.objects.filter(name=department).first()
        if d is not None:
            # print("department exist")
            return Response({
                "msg":"department exist"
            },status=status.HTTP_404_NOT_FOUND)
        # print("naya department banauna kabil")
        try:
            d =Department.objects.create(name=department)
            # print('la naya bano yahoo')
        except:
            # print('vayena')
            return Response({
                "msg":"khai k khai k"
            },status=status.HTTP_404_NOT_FOUND)

        
        
        
        
        return Response({
            "mgs":"hello"
        })
    
    def get(self,request):
        get_all = Department.objects.all()
        listma = list(get_all)
        serializer= DepartmentSerializer(get_all,many=True)
        # print(serializer.data)
        return Response({
            "msg":serializer.data,
        })

class AddDoctor(APIView):
    def post(self,request):
        # print("this is",request.data)
        username = request.data.get('username')
        email = request.data.get('email')
        staff_id = request.data.get('staffId')
        password = request.data.get('password')
        department = request.data.get('department')
        image = request.data.get('image')
        
        # print(username,email,staff_id,password,department,image)
        try:
            user= User.objects.create_user(username=username,email=email,staff_id=staff_id,password=password,department=department,role="doctor")
            # print("baneko ho?")
            
            dep = Department.objects.filter(name=department).first()
            
            dr=Doctor.objects.create(user=user,department=dep,profile_img=image)
            # print("yo bhayo? doctor wala")
        except:
            print("Banena")
            
        
        
        
        
        return Response({
            "msg":"la hai"
        })
    
    # 
    
    def put(self,request,id):
        print("pugenaaa?")
        id = request.query_params.get('id')
        username = request.data.get('username')
        email = request.data.get('email')
        staff_id = request.data.get('staffId')
        password = request.data.get('password')
        department = request.data.get('department')
        image = request.data.get('image')
        
        try:
            doctor = Doctor.objects.get(pk=id)
        except:
            print("paiyena")
            if username:
                doctor.user.username = username
            if email:
                doctor.user.email = email
            if staff_id:
                doctor.user.staff_id = staff_id
            if password:
                doctor.user.set_password(password)
            if department:
                doctor.department = department
            if image:
                doctor.profile_img = image 

            # Save the changes
            try:
                doctor.user.save()  
                doctor.save()
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        department_name = request.query_params.get('department')  # Get department name from query params
        department_id = request.query_params.get('department_id')  # Get department ID from query params

        # If department filter is provided, filter doctors by department
        if department_name or department_id:
            try:
                if department_name:
                    department = Department.objects.filter(name=department_name).first()
                elif department_id:
                    department = Department.objects.filter(id=department_id).first()
                
                if not department:
                    return Response({"error": "Department not found"}, status=404)

                doctors = Doctor.objects.filter(department=department).select_related('user')

                doctor_list = [{
                    "id":doctor.pk,
                    "username": doctor.user.username,
                    "department": doctor.department.name if doctor.department else "Unknown",
                    "profile": doctor.profile_img.url if doctor.profile_img else None,
                    "email": doctor.user.email,
                    "staffid": doctor.user.staff_id
                } for doctor in doctors]

                return Response({"msg": doctor_list}, status=200)

            except Exception as e:
                return Response({"error": str(e)}, status=500)

        # If no department filter is provided, return all doctors
        doctors = Doctor.objects.select_related('user', 'department').all()
        doctor_list = [{
            "id":doctor.pk,
            "username": doctor.user.username,
            "department": doctor.department.name if doctor.department else "Unknown",
            "profile": doctor.profile_img.url if doctor.profile_img else None,
            "email": doctor.user.email,
            "staffid": doctor.user.staff_id
        } for doctor in doctors]

        return Response({"msg": doctor_list}, status=200)


class DeleteDoctor(APIView):
    def delete(self,request,id):
        
        # print("this si",id)
        try:
            doctor = Doctor.objects.get(pk=id)
            print(doctor)
            doctor.delete()
            return Response({"msg":"doctor deleted"})
         
        except Exception as e:
            print('this ', str(e))    
        return Response({"msg":"gaas"},status=status.HTTP_404_NOT_FOUND)
    

class BookAppointment(APIView):
    def post(self, request):
        data = request.data
        patient_name = data.get("patient_name")
        contact_number = data.get("contact_number")
        address = data.get("address")
        appointment_date = data.get("appointment_date")
        department_name = data.get("department")
        doctor_name = data.get("doctor")
        reason = data.get("reason")

        try:
            # Find the department
            department = Department.objects.filter(name=department_name).first()
            if not department:
                return Response({"error": "Department not found"}, status=status.HTTP_400_BAD_REQUEST)

            # Find the doctor
            doctor = Doctor.objects.filter(user__username=doctor_name, department=department).first()
            if not doctor:
                return Response({"error": "Doctor not found"}, status=status.HTTP_400_BAD_REQUEST)

            # Create the appointment
            appointment = Appointment.objects.create(
                name=patient_name,
                contact_number=contact_number,
                address=address,
                appointment_date=appointment_date,
                department=department,
                doctor=doctor,
                reason_for_appointment=reason,
            )

            return Response({"msg": "Appointment booked successfully!"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class DoctorAppointments(APIView):
    def get(self, request, doctor_username):
        try:
            # Find the doctor by username
            doctor = Doctor.objects.filter(user__username=doctor_username).first()
            if not doctor:
                return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)

            # Fetch all appointments for this doctor
            appointments = Appointment.objects.filter(doctor=doctor)

            # Serialize the data
            appointment_list = [
                {
                    "patient_name": appointment.name,
                    "contact_number": appointment.contact_number,
                    "address": appointment.address,
                    "appointment_date": appointment.appointment_date,
                    "department": appointment.department.name,
                    "reason": appointment.reason_for_appointment,
                }
                for appointment in appointments
            ]

            return Response({"appointments": appointment_list}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class DoctorLoginView(APIView):

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        # print(email,password)

        user = authenticate(username=email, password=password)
        # print("hey",user)
        if user and user.is_doctor:
            # print("eta pugis?")
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Login successful",
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
                "doctor_username": user.username,  # Send doctor’s username
                "doctor_id":user.pk,
            })
        if user is None:
            # print("eta puginasssssss?")
            return Response({"error": "Invalid credentials"}, status=status.HTTP_404_NOT_FOUND)


class GetAppointments(APIView):
    def get(self, request, doctor_username):
        print(doctor_username)
        try:
            doctor = Doctor.objects.get(user__username=doctor_username)
            # print(doctor)
            appointments = Appointment.objects.filter(doctor=doctor)
            # print("this is appointments",appointments)

            appointment_list = [
                {
                    "id":appt.pk,
                    "patient_name": appt.name,
                    "contact_number": appt.contact_number,
                    "address": appt.address,
                    "appointment_date": appt.appointment_date,
                    "department": appt.department.name,
                    "reason": appt.reason_for_appointment,
                }
                for appt in appointments
            ]

            return Response({"appointments": appointment_list}, status=200)
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor not found"}, status=404)
    
    def put(self,request,id):
        print(id)
        print(request.data)
        name = request.data.get('patient_name')
        contact_number = request.data.get('contact_number')
        address = request.data.get('address')
        appointment_date = request.data.get('appointment_date')
        department = request.data.get('department')
        reason = request.data.get('reason')
        
        try:
            get_appointment = get_object_or_404(Appointment,pk=id)
            # print("paiyo-",get_appointment)
            department = Department.objects.filter(name=department).first()
            # get_appointment.
            get_appointment.name = name
            get_appointment.contact_number = contact_number
            get_appointment.address= address
            get_appointment.appointment_date = appointment_date
            get_appointment.department = department
            get_appointment.reason_for_appointment = reason
            
            get_appointment.save()
            print(get_appointment)
        except Exception as e:
            print("error",str(e))
        return Response({"msg":"hi"})
    
    def delete(self,request,id):
        print("this is ",id)
        try:
            delete_appointment = get_object_or_404(Appointment,pk=int(id))
            print("this is",delete_appointment)
            delete_appointment.delete()
            return Response({"msg":"deleted successfully"})
            
        
        except Exception as e:
            print("this is",str(e))
        
        return Response({
            "ms":"he"
        })

class AdminView(APIView):
    def post(self,request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        user1 = User.objects.filter(email=email).first()

        
        print("the password is ",user1.check_password(password))
        user = authenticate(username=email,password=password)
        print("this is admin user",user)
        print("this is admin or not", user.is_admin)
        if user is not None and user.is_admin:
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Login successful",
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
                "admin_name": user.username,
                "admin_id":user.pk,
            })
        else:
            print("not okay")
            return Response({
                "msg":"bhag"
            })
        