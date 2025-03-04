
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200), nullable=False)

with app.app_context():
    if not os.path.exists('tasks.db'):
        db.create_all()

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify(tasks=[{'id': task.id, 'text': task.text} for task in tasks])

@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.json
    new_task = Task(text=data['text'])
    db.session.add(new_task)
    db.session.commit()
    return jsonify(message='Task added!')

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify(message='Task deleted!')
    else:
        return jsonify(message='Task not found!'), 404

if __name__ == '__main__':
    print("\nServer läuft! Verfügbare Endpunkte:")
    print("GET  all tasks:   http://127.0.0.1:5000/api/tasks")
    print("POST new task:    http://127.0.0.1:5000/api/tasks")
    print("DELETE task:      http://127.0.0.1:5000/api/tasks/<id>\n")
    app.run(debug=True)
