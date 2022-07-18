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
        # return 'Peterが増えるプログラムです'
        return jsonify({"language":"python"})

    # @app.route('/insert')
    # def insert_default_students():
    #     all_peter = User.query.filter_by(name='peter').all()
    #     how_many_peter = len(all_peter)
    #     return '今Peterは{}人います'.format(how_many_peter)


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

    # @app.route('/delete')
    # def delete_user():
    #     peter = User.query.filter_by(name='peter').first()
    #     if peter is not None:
    #         db.session.delete(peter)
    #         db.session.commit()
    #         return 'Peterを減らしました。'
    #     else:
    #         return 'Peterはひとりもいません'

    return app


app = create_app()
CORS(app)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)