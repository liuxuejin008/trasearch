import re

from sanic import response, Sanic
app = Sanic("stock")
import requests
@app.route('/')
def handle_request(request):
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
    }
    fact_sheet_chair = request.args.get("q")
    lang = request.args.get("lang")
    prompt = f"""
    你的任务是做语言翻译。

    根据```标记的语句翻译成为对应{lang}。

    待翻译的语句: ```{fact_sheet_chair}```
    """
    data = {
        "messages": [{"role": "user", "content": prompt}],
        "model": "mixtral-8x7b-32768"
    }
    response_1 = requests.post(url, headers=headers, json=data)

    url = 'https://www.google.com.hk'
    if response_1.status_code == 200:
        print("Request successful. Response:")
        print(response_1.json())
        message = response_1.json()["choices"][0]["message"]["content"]
        print("=========================")
        print(message)

        result = re.search(r'is "(.*?)"', message).group(1)
        print(result+"===========")
        url = url+"/search?q="+result
        print("=========================")
    else:
        print(f"Request failed with status code: {response_1.status_code}")
        print(response_1.text)
    return response.redirect(url)



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8088)
