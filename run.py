from hwsmodule import app

if __name__ == '__main__':
    app.run(host=app.config.get("HOST", "localhost"),
            port=app.config.get("PORT", 5000))
