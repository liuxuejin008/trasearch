import json
import re
import traceback

from sanic import response, Sanic
app = Sanic("stock")
import requests
@app.route('/search')
def handle_request(request):
    try:
        goole_url = 'https://www.google.com'
        fact_sheet_chair = request.args.get("q")
        if fact_sheet_chair is None:
            return response.redirect(goole_url)
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
        }

        lang = request.args.get("language")
        if lang is None:
            lang = "英语"
        prompt = f"""
            你的任务是做语言翻译。
            根据```标记的语句翻译成为对应{lang}，请仅以json格式输出，不要做解释。
            Example Output JSON: {{"translation": "Chinese"}}
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
            print("=====================")
            print(message)
            print("=====================")
            json_item = json.loads(message)
            transword = json_item['translation']
            search_url = goole_url + "/search?q=" + transword
            print(search_url)
        else:
            print(f"Request failed with status code: {response_1.status_code}")
            print(response_1.text)
        return response.redirect(search_url)
    except Exception as e:
        traceback.print_exc()
    # 发生异常时执行回滚操作
        print(f"An error occurred: {e}")


#if __name__ == "__main__":
    #app.run(host="0.0.0.0", port=8088)
