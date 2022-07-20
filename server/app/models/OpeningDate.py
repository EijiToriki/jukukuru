from app.database import db


class OpeningDate(db.Model):

    __tablename__ = 'openingdates'

    dateId = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(10), nullable=False)
    dow = db.Column(db.String(1), nullable=False)
    koma1 = db.Column(db.Boolean, nullable=False)
    koma2 = db.Column(db.Boolean, nullable=False)
    koma3 = db.Column(db.Boolean, nullable=False)
    koma4 = db.Column(db.Boolean, nullable=False)
    koma5 = db.Column(db.Boolean, nullable=False)
    koma6 = db.Column(db.Boolean, nullable=False)
    koma7 = db.Column(db.Boolean, nullable=False)


    def __repr__(self):
        return '<OpeningDate dateId={dateId} date={date}>'.format(
                dateId=self.dateId, date=self.date)
    
    def toDict(self):
        return{
            'dateId': self.dateId,
            'date': self.date,
            'dow': self.dow,
            'koma1': self.koma1,
            'koma2': self.koma2,
            'koma3': self.koma3,
            'koma4': self.koma4,
            'koma5': self.koma5,
            'koma6': self.koma6,
            'koma7': self.koma7,
        }