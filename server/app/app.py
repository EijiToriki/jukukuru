from flask import Flask, jsonify
from flask_cors import CORS
from app.database import init_db, db
from app.models.Student import Student


def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    init_db(app)

    @app.route('/')
    def index():
        return '生徒の登録・削除・更新を行う'
        # return jsonify({"language":"python"})

    @app.route('/insert')
    def insert_default_students():
        all_student = Student.query.all()
        student_num = len(all_student)        

        student = Student(studentId=student_num+1, name='eiji toriki', grade=1)
        db.session.add(student)
        db.session.commit()
        return f'{student.studentId}番 {student.name} を追加'

    @app.route('/delete')
    def delete_student():
        student = Student.query.filter_by(studentId=1).first()
        if student is not None:
            db.session.delete(student)
            db.session.commit()
            return '削除完了'
        else:
            return '削除対象なし'

    # @app.route('/show')
    # def show_users():
    #     all_peter = User.query.filter_by(name='peter').all()
    #     how_many_peter = len(all_peter)
    #     return '今Peterは{}人います'.format(how_many_peter)

    # @app.route('/add')
    # def add_user():
    #     peter = User(name='peter')
    #     db.session.add(peter)
    #     db.session.commit()
    #     return 'Peterを増やしました。'


    return app


app = create_app()
CORS(app)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)