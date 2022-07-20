from app.database import db


class ComingDate(db.Model):

    __tablename__ = 'comingdates'

    dateId = db.Column(db.Integer, primary_key=True)
    studentId = db.Column(db.Integer, primary_key=True)
    isComeKoma1 = db.Column(db.Boolean, nullable=False)
    isComeKoma2 = db.Column(db.Boolean, nullable=False)
    isComeKoma3 = db.Column(db.Boolean, nullable=False)
    isComeKoma4 = db.Column(db.Boolean, nullable=False)
    isComeKoma5 = db.Column(db.Boolean, nullable=False)
    isComeKoma6 = db.Column(db.Boolean, nullable=False)
    isComeKoma7 = db.Column(db.Boolean, nullable=False)


    def __repr__(self):
        return '<ComingDate dateId={dateId} studentId={studentId}>'.format(
                dateId=self.dateId, studentId=self.studentId)
    
    def toDict(self):
        return{
            'dateId': self.dateId,
            'studentId': self.studentId,
            'isComeKoma1': self.isComeKoma1,
            'isComeKoma2': self.isComeKoma2,
            'isComeKoma3': self.isComeKoma3,
            'isComeKoma4': self.isComeKoma4,
            'isComeKoma5': self.isComeKoma5,
            'isComeKoma6': self.isComeKoma6,
            'isComeKoma7': self.isComeKoma7
        }