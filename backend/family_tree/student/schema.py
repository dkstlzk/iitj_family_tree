import graphene
from graphene_django import DjangoObjectType
from student.models import Student

class StudentType(DjangoObjectType):
    class Meta:
        model= Student
        fields= ("id","name","branch","year","picture","homeTown","extraCurriculars","socialMedia", "linkedIn","email","parentId","roll_no")
        filter_fields=["id","name","branch","year","email","parentId","roll_no"]


class Query(graphene.ObjectType):
    students=graphene.List(StudentType)
    student_path= graphene.List(StudentType, roll=graphene.String())
    student_sibling= graphene.List(StudentType, roll=graphene.String())

    def resolve_students(root,info):
        return Student.objects.all()

    def resolve_student_path(root, info, roll):
        pathObjects=[]
        while(Student.objects.get(roll_no=roll).parentId!="root"):
            student=Student.objects.get(roll_no=roll)
            pathObjects.append(student)
            roll= student.parentId
        pathObjects.append(Student.objects.get(roll_no=roll))
        return pathObjects
    
    def resolve_student_sibling(root,info, roll):
        student=Student.objects.get(roll_no=roll)
        return Student.objects.filter(parentId=student.parentId).exclude(roll_no=roll)

schema=graphene.Schema(query=Query)

    
