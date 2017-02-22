json.extract! chat, :id, :sender, :body, :created_at, :updated_at
json.url chat_url(chat, format: :json)