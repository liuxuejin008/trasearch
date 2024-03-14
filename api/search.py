import re

from sanic import response, Sanic
app = Sanic("stock")
import requests
@app.route('/search')
def handle_request(request):
    url = 'https://www.google.com.hk'
    fact_sheet_chair = request.args.get("q")
    print("=============================================")
    if fact_sheet_chair is None:
        return response.redirect(url)
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
    }

    lang = request.args.get("language")
    if lang is None:
        lang="英语"
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
    if response_1.status_code == 200:
        print("Request successful. Response:")
        print(response_1.json())
        message = response_1.json()["choices"][0]["message"]["content"]
        print("=========================")
        print(message)

        result = re.search(r'is "(.*?)"', message).group(1)
        print(result+"===========")
        url = url+"/search?q="+result
    else:
        print(f"Request failed with status code: {response_1.status_code}")
        print(response_1.text)
    return response.redirect(url)

