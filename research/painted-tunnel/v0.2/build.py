from pathlib import Path
import re
import json
root=Path(__file__).resolve().parent
style=(root/'theme.css').read_text()
template=(root/'ui.template.html').read_text()
verification=json.loads((root/'verification.json').read_text())
if (root/'interface-verification.json').exists():
    verification['interfaceLogic']=json.loads((root/'interface-verification.json').read_text())
for key,value in {'__STYLE__':style,'__ENGINE__':(root/'engine.js').read_text(),'__EVALUATOR__':(root/'evaluator.js').read_text(),'__REGRESSIONS__':(root/'regressions.js').read_text(),'__VERIFICATION__':json.dumps(verification,indent=2)}.items():
    template=template.replace(key,value)
assert not re.search(r'__[A-Z]+__',template)
(root/'painted-tunnel-v0.2.html').write_text(template)
print('Built standalone offline HTML.')
