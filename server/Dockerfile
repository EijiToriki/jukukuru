FROM python:3.8.11-slim-buster

ADD ./server/requirements.txt server/tmp/requirements.txt

RUN pip install -r server/tmp/requirements.txt

WORKDIR /server/app

COPY ./server/app/ /server/app

CMD ["python", "/server/app/app.py"]