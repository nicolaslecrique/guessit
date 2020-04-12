from sentence_transformers import SentenceTransformer

if __name__ == '__main__':
    model_name_or_path = 'bert-base-nli-stsb-mean-tokens'
    targer_folder_path = '../ml_model'    

    model = SentenceTransformer(model_name_or_path)
    model.save(targer_folder_path)
