# 清空dist目录中的旧文件
echo '正在清除原有dist文件...'
rm -rf dist/*.css

# 打包出不压缩的CSS文件my-ui.css
echo '正在生成tuitui-ui.css文件...'
npx postcss src/my-ui.css -o dist/my-ui.css -u postcss-import autoprefixer --no-map 

# 打包出被压缩的CSS文件my-ui.min.css
echo '正在生成my-ui.min.css文件...'
npx postcss src/my-ui.css -o dist/my-ui.min.css -u postcss-import autoprefixer cssnano --no-map 
————————————————
版权声明：本文为CSDN博主「寂寞花如雪」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_40665861/article/details/106924160