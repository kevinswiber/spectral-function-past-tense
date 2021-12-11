export interface Conditions {
    STARTWORD: number;
    PREV1OR2TAG: number;
    PREVTAG: number;
    NEXTTAG: number;
    NEXTTAG2: number;
    PREVTAG2: number;
    PREVWORD: number;
    PREVWORDPREVTAG: number;
    CURRENTWD: number;
    WDPREVTAG: number;
    WDPREVWD: number;
    NEXT1OR2OR3TAG: number;
    NEXTBIGRAM: number;
    NEXT2WD: number;
    WDNEXTTAG: number;
    WDNEXTWD: number;
    PREV1OR2OR3TAG: number;
    SURROUNDTAG: number;
    SURROUNDTAGWD: number;
    NEXTWD: number;
    NEXT1OR2TAG: number;
    PREV2TAG: number;
    NEXT2TAG: number;
    PREV2TAGNEXTTAG: number;
    NEXT1OR2WD: number;
    PREV2WD: number;
    RBIGRAM: number;
    PREV1OR2WD: number;
    CURRENTWDRGX: number;
    END: number;
    PREV2WORDS: number;
}
export declare const conditions: Conditions;