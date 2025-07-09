import os

directory_curret = os.getcwd()

# Modifica el token en todos los archivos http en lugar de hacerlo manualmente cada vez que se 
# vuelva a cargar la base de datos y volverse a registrar o iniciar sesion
def update_token(token: str):
    directories = os.listdir(directory_curret + '/src/test-http')
    
    for dir in directories:
        archives = os.listdir(directory_curret + f'/src/test-http/{dir}')
        for name_archive in archives:
            route = directory_curret + f'/src/test-http/{dir}/{name_archive}'
            archive = open(route, encoding='utf-8')
            content_archive = archive.readlines()
            archive.close()
            
            contains_token = list(filter(lambda x: '@Token' in x, content_archive))

            if (len(contains_token) == 0):
                continue
            
            index_content = content_archive.index(contains_token[0])
            split_content = content_archive[index_content].split(" ")
            split_content.pop()
            split_content.append(token + '\n')
            
            content_archive[index_content] = " ".join(split_content)
            
            archive_write = open(route, mode='w', encoding='utf-8')
            archive_write.writelines(content_archive)
            archive_write.close()

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVVc3VhcmlvIjoiUGVwaXRvIiwiaWQiOjUxLCJpYXQiOjE3NTEzMjQ1NjYsImV4cCI6MTc2OTMyNDU2Nn0.cY8Yk3WR_Ch4vOYer_rRr_CP0MMoYu3WsefG5JhQJnA"
# token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVVc3VhcmlvIjoiRWplbXBsbzEyIiwiaWQiOjUzLCJpYXQiOjE3NTIwMTMzNzAsImV4cCI6MTc3MDAxMzM3MH0.XFPaEAdEM0wBu2tusNr2XJ8TesK3u1w429SRHVv-KI0"
# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVVc3VhcmlvIjoiRWplbXBsbzEyIiwiaWQiOjU0LCJpYXQiOjE3NTIwODY1OTksImV4cCI6MTc3MDA4NjU5OX0.gxIsM-SKw90dd8onQG7wRdGBxDiIBxlLETap1LY1d4U
# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVVc3VhcmlvIjoiUGVwaXRvIiwiaWQiOjU3LCJpYXQiOjE3NTIwODgwNDksImV4cCI6MTc3MDA4ODA0OX0.iA6SeqwM8I2LWmsfIvKJJKrFhH7RGyqrAVp4e3rqbC0
update_token(token)
