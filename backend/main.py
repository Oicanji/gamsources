from app import create_app

app = create_app()

if __name__ == '__main__':
    #login_manager
    app.run(debug=True)
    