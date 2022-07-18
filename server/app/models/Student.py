from app.database import db


class Student(db.Model):

    __tablename__ = 'students'

    studentId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    grade = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Student studentId={studentId} name={name}>'.format(
                studentId=self.studentId, name=self.name)
    
    def toDict(self):
        return{
            'studentId': self.studentId,
            'name': self.name,
            'grade': self.grade
        }