#!/bin/sh

dayNo=$1
theme=$2
advent_session=$ADVENT_SESSION

curl -b "session=${advent_session}" -o ./input/input.day$dayNo.txt https://adventofcode.com/2024/day/$dayNo/input

cp -r ./src/template ./src/day$dayNo
sed -i "" "s/dayNo/${dayNo}/g" "./src/day${dayNo}/day.unit.test.ts"
sed -i "" "s/dayTheme/${theme}/g" "./src/day${dayNo}/day.unit.test.ts"
mv "./src/day${dayNo}/day.ts" "./src/day${dayNo}/day${dayNo}.ts"
mv "./src/day${dayNo}/day.unit.test.ts" "./src/day${dayNo}/day${dayNo}.unit.test.ts"
